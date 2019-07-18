from django.shortcuts import render
from .models import Snippet

def index(request):
    context = {
        'snippets': Snippet.objects.order_by('-date')
        if request.user.is_authenticated else []
    }

    return render(request, 'index.html', context)