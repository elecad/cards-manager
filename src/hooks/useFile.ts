export const useFile = () => {
    const fileToBlob = (file: File, callback: (blob: Blob) => void) => {
        const Reader = new FileReader();
        Reader.readAsArrayBuffer(file);
        Reader.addEventListener("load", (f) => {
            if (!(f.target && f.target.result)) return;
            callback(new Blob([f.target.result]))
        });
    }

    return {fileToBlob}
}