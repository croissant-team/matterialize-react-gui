const PORT = 9000;
const DOMAIN = `http://localhost:${PORT}`

export const availableCameras = `${DOMAIN}/camera/options`
export const setCamera = `${DOMAIN}/camera/set`
export const currentCamera = `${DOMAIN}/camera/current`

export const availableMatters = `${DOMAIN}/matter/options`
export const setMatterType = `${DOMAIN}/matter/set`
export const currentMatter = `${DOMAIN}/matter/current`

export const captureCleanplate = `${DOMAIN}/cleanplate/take`

export const clearBackground = `${DOMAIN}/background/clear`

export const setVideoBackground = `${DOMAIN}/background/video`
export const setImageBackground = `${DOMAIN}/background/set`

export const setBlurBackground = `${DOMAIN}/background/blur`

export const availableDesktops = `${DOMAIN}/background/desktop/options`
export const setScreenCaptureBackground = `${DOMAIN}/background/desktop`

export const stopRecording = `${DOMAIN}/recording/stop`
export const startRecording = `${DOMAIN}/recording/start`

export const getMatterConfigs = `${DOMAIN}/matters/config`
export const updateMatterConfig = `${DOMAIN}/matter/config/update`
export const importMatterConfigs = `${DOMAIN}/matters/config/import_file`
export const exportMatterConfigs = `${DOMAIN}/matters/config/export_file`

export const startMatterBenchmark = `${DOMAIN}/matters/benchmark`

export const shutdown = `${DOMAIN}/shutdown`
