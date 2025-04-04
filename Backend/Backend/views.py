from django.http import HttpResponse

products = [
    {
        "name":"lakshay",
        "roll_no":12
    }
]

def productList(request):
    a = products
    return HttpResponse(a)