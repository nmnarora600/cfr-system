#Enter your code here
import random
import string

def generate_random_key(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
for i in range(10):
    x=generate_random_key(10)
    print("hey ",x)