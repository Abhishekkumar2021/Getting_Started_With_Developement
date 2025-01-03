
public class Main {
    static public void main(String[] args) {
        System.out.println("Hello World!");
        int argc = args.length;

        System.out.printf("Number of commandline arguments: %d\n", argc);
        System.out.println("Arguments are: ");
        for (String item : args) {
            System.out.println(item);
        }
    }
}
