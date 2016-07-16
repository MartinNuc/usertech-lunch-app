export class Utility {
    static getTodayString() {
        let today = new Date();
        let dateKey = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        return dateKey;
    }
}
