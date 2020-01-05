export function Debug(type: string, message: string) {
    if (!process.env.prod) {
        switch (type) {
            case 'error':
                console.error(message);
                break;
            case 'info':
                console.info(message);
                break;
            case 'warn':
                console.warn(message);
                break;
            case 'log':
                console.log(message);
                break;
            default:
                console.log(message);
        }
    }
}