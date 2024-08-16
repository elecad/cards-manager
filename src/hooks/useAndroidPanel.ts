export const useAndroidPanel = () => {

    const t = 5;
    const n = 30;
    let i = 0; //индекс текущего промежуточного цвета

    function fadeColor(element: HTMLMetaElement, from: string, to: string) {
        i++; //изменяем индекс промежуточного цвета

        /*процент содержания конечного цвета в текущем промежуточном цвете;
изменяется от 0 (не включая 0) до 1 (1 = 100%)*/
        const finishPercent = i / n;
        /*процент содержания начального цвета в текущем промежуточном цвете;
        изменяется от 1 до 0 (1 = 100%) */
        const startPercent = 1 - finishPercent;

        //разбиваем RGB-триплеты на красный, зеленый и синий в виде массива
        const aRGBStart = from.replace("#", "").match(/.{2}/g);
        const aRGBFinish = to.replace("#", "").match(/.{2}/g);


        //вычисляем значения красного, зеленого, синего промежуточного цвета
        //@ts-ignore
        const R = Math.floor(('0x' + aRGBStart[0]) * startPercent + ('0x' + aRGBFinish[0]) * finishPercent);
        //@ts-ignore
        const G = Math.floor(('0x' + aRGBStart[1]) * startPercent + ('0x' + aRGBFinish[1]) * finishPercent);
        //@ts-ignore
        const B = Math.floor(('0x' + aRGBStart[2]) * startPercent + ('0x' + aRGBFinish[2]) * finishPercent);


        //присвоить в качестве фонового цвета кнопки i-тый цвет
        element.content = 'rgb(' + R + ',' + G + ',' + B + ')'

        if (i < n) {
            setTimeout(() => {
                fadeColor(element, from, to)
            }, t);
        } else {
            i = 0;
        }
    }

    return {fadeColor}

}