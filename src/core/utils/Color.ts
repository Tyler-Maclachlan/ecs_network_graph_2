export function hexToRgbArray(hex: string) {
    const rgbArray: number[] = [];
    hex = hex.replace('#', '');

    if (hex.length !== 6) {
        throw new Error(`Invalid RGB hex string found ${hex}`);
    }

    rgbArray[0] = parseInt(hex.slice(0, 2), 16) / 255.0;
    rgbArray[1] = parseInt(hex.slice(2, 4), 16) / 255.0;
    rgbArray[2] = parseInt(hex.slice(4, 6), 16) / 255.0;

    return rgbArray;
}

export function hexToRgbaArray(hex: string) {
    const rgbaArray: number[] = [];
    hex = hex.replace('#', '');

    if (hex.length !== 8) {
        throw new Error(`Invalid RGBA hex string found: ${hex}`);
    }

    rgbaArray[0] = parseInt(hex.slice(0, 2)) / 255.0;
    rgbaArray[1] = parseInt(hex.slice(2, 4)) / 255.0;
    rgbaArray[2] = parseInt(hex.slice(4, 6)) / 255.0;
    rgbaArray[3] = parseInt(hex.slice(6, 8)) / 255.0;

    return rgbaArray;
}