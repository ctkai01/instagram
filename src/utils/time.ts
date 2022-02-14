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

function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

export const convertISOTime = (timeISO: string) => {
    const time = new Date(timeISO);
    return (
        [
          time.getFullYear(),
          padTo2Digits(time.getMonth() + 1),
          padTo2Digits(time.getDate()),
        ].join('-') +
        ' ' +
        [
          padTo2Digits(time.getHours()),
          padTo2Digits(time.getMinutes()),
          padTo2Digits(time.getSeconds()),
        ].join(':')
      );
}