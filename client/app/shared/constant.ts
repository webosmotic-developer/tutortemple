export class Constant {
    public static API_URL = '/';
    public static EMAIL_REG_EX = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    public static PASSWORD_REG_EX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z!@#$%^&*?.+-\\d]{8,}$');
}
