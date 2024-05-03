import java.util.Scanner;
public class Calculator {
    public static void main(String[] args) {
        
    Scanner user_input = new Scanner(System.in);

    System.out.println("Please enter the first number: ");
    String number_one = user_input.next();

    System.out.println("Please enter the second number: ");
    String number_two = user_input.next();

    double user_number_one = Double.parseDouble(number_one);
    double user_number_two = Double.parseDouble(number_two);
    
    System.out.println("Please enter the operation: ");
    String user_operation = user_input.next();

    System.out.println(final_calulcation(user_number_one, user_number_two, user_operation));
    }

    public static double final_calulcation(double firstnumber, double secondnumber, String operation)
    {
        double calculationl = 0;

        if (null != operation)
            switch (operation) 
            {
               case "/":
                    calculationl = firstnumber/secondnumber;
                    break;
                case "*":
                    calculationl = firstnumber*secondnumber;
                    break;
                case "+":
                    calculationl = firstnumber + secondnumber;
                    break;
                case "-":
                    calculationl = firstnumber - secondnumber;
                    break;
                default:
                    break;
            }
        return calculationl;
    }
}
