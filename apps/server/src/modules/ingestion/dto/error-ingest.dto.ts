import { DeviceInfo, ErrorPayload, IStacktraceFrame } from "@bugpilot/common";
import { IsString, IsNotEmpty, IsObject, IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { SessionUserDto } from "./session-user.dto";

export class ErrorIngestDto implements ErrorPayload {
    @IsString()
    @IsNotEmpty()
    level: string;

    @IsString()
    @IsNotEmpty()
    environment: string;

    @IsObject()
    @IsNotEmpty()
    @Type(() => SessionUserDto)
    user: SessionUserDto;

    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsString()
    @IsNotEmpty()
    projectId: string;

    @IsArray()
    @IsNotEmpty()
    breadcrumbs: Record<any, any>[];

    @IsObject()
    @IsNotEmpty()
    device: DeviceInfo;

    @IsObject()
    @IsNotEmpty()
    extra: Record<any, any>;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    source: string;

    @IsArray()
    @IsNotEmpty()
    @Type(() => StacktraceFrameDto)
    stacktrace: StacktraceFrameDto[];

    @IsArray()
    @IsNotEmpty()
    tags: string[];

    @IsString()
    @IsNotEmpty()
    timestamp: string;
}

export class StacktraceFrameDto implements IStacktraceFrame {
    @IsString()
    @IsNotEmpty()
    functionName: string;

    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsNumber()
    @IsNotEmpty()
    lineNumber: number;
}