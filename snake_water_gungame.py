import random

friend=random.choice([-1,1,0])
youstr =input("Enter your choice: ")
youdict ={"s":1,"w":-1,"g":0}
reversedict ={1:"snake",-1:"water",0:"gun"}

you =youdict[youstr]
print(f"you choice {reversedict[you]}\nfriend choice {reversedict[friend]}")

if(friend ==you):
    print("It's draw")

else:
    if(friend==-1 and you==1):
        print("you win!")

    elif(friend==-1 and you==0):
        print("you lose!")

    elif(friend==1 and you==-1):
        print("you lose!")

    elif(friend==1 and you==0):
        print("you win!")

    elif(friend==0 and you==-1):
        print("you win!")

    elif(friend==0 and you==1):
        print("you lose!")

    else:
        print("something went wrong!")
