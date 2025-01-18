from django.shortcuts import render

def home(request):
    return render(request, 'home.html', {'title': 'Color Cookies'})

def title_screen(request):
    return render(request, 'titlescreen.html')

def start(request):
    return render(request, 'start.html')

def instructions(request):
    return render(request, 'instructions.html')

def about(request):
    return render(request, 'about.html')
