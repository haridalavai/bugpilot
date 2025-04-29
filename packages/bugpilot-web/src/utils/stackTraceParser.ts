import { IStacktraceFrame, SourceCodeContext } from "@bugpilot/common";

export async function parseStackTrace(error: Error): Promise<IStacktraceFrame[]> {
    const stack = error.stack || '';
    const lines = stack.split('\n').slice(1); // Remove the error message line
    const stackFrames: Promise<IStacktraceFrame>[] = [];

    for (const line of lines) {
        // Chrome/Firefox style: "at functionName (fileName:lineNumber:columnNumber)"
        const chromeMatch = line.match(/^\s*at\s+(.*?)\s+\((.*?):(\d+):(\d+)\)$/);
        if (chromeMatch) {
            stackFrames.push((async () => ({
                functionName: chromeMatch[1] || '',
                fileName: chromeMatch[2] || '',
                lineNumber: parseInt(chromeMatch[3], 10),
                columnNumber: parseInt(chromeMatch[4], 10),
                source: await getSourceCodeContext(chromeMatch[2], parseInt(chromeMatch[3], 10))
            }))());
            continue;
        }

        // Chrome/Firefox style with no function name: "at fileName:lineNumber:columnNumber"
        const chromeAnonymousMatch = line.match(/^\s*at\s+(.*?):(\d+):(\d+)$/);
        if (chromeAnonymousMatch) {
            stackFrames.push((async () => ({
                functionName: '',
                fileName: chromeAnonymousMatch[1] || '',
                lineNumber: parseInt(chromeAnonymousMatch[2], 10),
                columnNumber: parseInt(chromeAnonymousMatch[3], 10),
                source: await getSourceCodeContext(chromeAnonymousMatch[1], parseInt(chromeAnonymousMatch[2], 10))
            }))());
            continue;
        }

        // Safari style: "functionName@fileName:lineNumber:columnNumber"
        const safariMatch = line.match(/^(.*?)@(.*?):(\d+):(\d+)$/);
        if (safariMatch) {
            stackFrames.push((async () => ({
                functionName: safariMatch[1] || '',
                fileName: safariMatch[2] || '',
                lineNumber: parseInt(safariMatch[3], 10),
                columnNumber: parseInt(safariMatch[4], 10),
                source: await getSourceCodeContext(safariMatch[2], parseInt(safariMatch[3], 10))
            }))());
            continue;
        }
    }

    return Promise.all(stackFrames);
}

export async function getSourceCodeContext(
    fileName: string | undefined,
    lineNumber: number | undefined,
    contextLines: number = 5
): Promise<SourceCodeContext[] | null> {
    if (!fileName || !lineNumber) return null;

    try {
        const response = await fetch(fileName);
        const sourceCode = await response.text();
        const lines = sourceCode.split('\n');

        const start = Math.max(0, lineNumber - contextLines - 1);
        const end = Math.min(lines.length, lineNumber + contextLines);

        return lines
            .slice(start, end)
            .map((content, index) => ({
                line: (start + index + 1).toString(),
                content: content
            }));
    } catch (error) {
        console.error('Failed to fetch source context:', error);
        return null;
    }
} 