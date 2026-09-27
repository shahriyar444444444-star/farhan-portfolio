import math


a = int(input("Enter your 1st num : "))
b = int(input("Enter your 2nd num :  "))
c = int(input("Enter your 3rd num :  "))
d = (b*b-(4*a*c))

if d == 0:
    x = (-b/2*a)
    print(f"Roots are real and the value is {x}")

elif d>0:
    x1 = (-b+math.sqrt(d)/2*a)
    x2 = (-b-math.sqrt(d)/2*a)
    print(f"Roots are real and the values are {x1} and {x2}")


else:
    print("Roots are imaginary")


