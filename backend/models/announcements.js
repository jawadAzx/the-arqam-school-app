class announcements extends Model {
    constructor(title, description, date, time,id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.id = id;
    }
}