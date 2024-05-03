import java.util.Scanner;  // Import the Scanner class

public class Test
{
    public static void main(String args[])
    {
        Scanner user_input = new Scanner(System.in);
        System.out.println("Please Enter An Integral");

        String integral_string = user_input.nextLine();
        System.out.println("Integral entered is: "+ integral_string);
    }

    public static int integral_calculator()
    {

        int user_intergrated = 1;
        return user_intergrated;
        
    }
}