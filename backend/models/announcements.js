class announcements extends Model {
    constructor(title, description, date, time, id, type, class_Var) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.id = id;
        this.type = type;
        this.class_Var = class_Var;
    }
}