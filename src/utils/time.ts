import moment from "moment";

 interface IConvertTime {
    format: string;
    fromNow: boolean
}

type datePrefix = 'm' | 'd' | 'M' | 'y'

export const convertTime = (time: string, numberAgo: number, datePrefix: datePrefix = 'd'): IConvertTime => {
    let format;
    let fromNow = false;
    const time7Ago = moment().add(-numberAgo, datePrefix).format('YYYY-MM-DD hh:mm:ss');
   
    if (moment().format('YYYY') !== moment(time).format('YYYY')) {
        format = 'MMMM DD, YYYY';
    } else if (time7Ago < time) {
        fromNow = true;
        format = '';
    }
    else {
        format = 'MMMM DD';
    }

    return {
        format: format,
        fromNow: fromNow
    }
}