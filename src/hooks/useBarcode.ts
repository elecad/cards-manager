import {BarcodeDetector as BarcodeDetectorPolyfill, setZXingModuleOverrides} from "barcode-detector";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

export const BARCODES: { [key: string]: string } = {
    // detected: generated
    code_128: "CODE128",
    code_39: "CODE39",
    codabar: "codabar",
    ean_13: "EAN13",
    ean_8: "EAN8",
    itf: "ITF", //???
    qr_code: "qr_code",
    upc_a: "UPC", //???
    upc_e: "UPC", // ???
};

export const useBarcode = () => {
    setZXingModuleOverrides({
        locateFile: () => {
            console.log("WASM Set!");
            return "/zxing_reader.wasm";
        },
    });
    const barcodeDetector = new BarcodeDetectorPolyfill()
    const detect = async (blob: Blob) => {
        return await barcodeDetector.detect(blob)
    }

    const generate = async (data: string, type: string) => {
        const generatedType = BARCODES[type]
        if (!generatedType) throw new Error("This Barcode is not supported");

        let src = ""

        if (generatedType === BARCODES.qr_code) {
            src = await QRCode.toDataURL(data);
        } else {
            const placeholderElement = document.createElement("img")
            JsBarcode(placeholderElement, data, {
                format: generatedType,
                flat: true,
                displayValue: false,
                margin: 20,
            });
            src = placeholderElement.src;
        }

        return src
    }

    return {detect, generate}
}