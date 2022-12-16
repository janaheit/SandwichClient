export class DateIoService {

  formatDate(date: Date){
    let dateString = '';
    dateString = dateString + date.getDay() + "-";
    dateString = dateString + (date.getMonth() +1) + "-";
    dateString += date.getFullYear();
    return dateString;

  }
}
