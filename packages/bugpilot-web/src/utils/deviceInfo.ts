import { DeviceInfo } from "@bugpilot/common/types/InjestPayload.type";


function getBrowserInfo(): DeviceInfo['browser'] {
  const ua = navigator.userAgent;
  let browserName = "unknown";
  let browserVersion = "unknown";

  // Detect browser name and version
  if (ua.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "unknown";
  } else if (ua.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "unknown";
  } else if (ua.indexOf("Safari") > -1) {
    browserName = "Safari";
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "unknown";
  } else if (ua.indexOf("Edge") > -1) {
    browserName = "Edge";
    browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || "unknown";
  }

  return {
    name: browserName,
    version: browserVersion,
    language: navigator.language
  };
}

function getOSInfo(): DeviceInfo['os'] {
  const ua = navigator.userAgent;
  let osName = "unknown";
  let osVersion = "unknown";

  if (ua.indexOf("Win") > -1) {
    osName = "Windows";
    osVersion = ua.match(/Windows NT ([0-9.]+)/)?.[1] || "unknown";
  } else if (ua.indexOf("Mac") > -1) {
    osName = "MacOS";
    osVersion = ua.match(/Mac OS X ([0-9._]+)/)?.[1]?.replace(/_/g, '.') || "unknown";
  } else if (ua.indexOf("Linux") > -1) {
    osName = "Linux";
  } else if (ua.indexOf("Android") > -1) {
    osName = "Android";
    osVersion = ua.match(/Android ([0-9.]+)/)?.[1] || "unknown";
  } else if (ua.indexOf("iOS") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) {
    osName = "iOS";
    osVersion = ua.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || "unknown";
  }

  return {
    name: osName,
    version: osVersion
  };
}

export function getDeviceInfo(): DeviceInfo {
  const deviceInfo: DeviceInfo = {
    browser: getBrowserInfo(),
    os: getOSInfo(),
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
      orientation: screen.orientation?.type || 'unknown'
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };

  // Add optional information if available
  if (navigator.hardwareConcurrency) {
    deviceInfo.cpu = {
      cores: navigator.hardwareConcurrency,
      architecture: navigator.platform,
    };
  }

//   if (navigator.deviceMemory) {
//     deviceInfo.memory = navigator.deviceMemory;
//   }

  return deviceInfo;
} 