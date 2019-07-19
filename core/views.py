from django.shortcuts import render, get_list_or_404, redirect
from .models import Snippet
from core.forms import SnippetForm
from django.views.generic.edit import CreateView

def index(request):
    """View function for home page of site."""

    list_of_snippets = Snippet.objects.all()
    
    context = {
        'list_of_snippets': list_of_snippets,
     
    }
    return render(request, 'index.html', context=context)

def add_snippet(request):
    snippet = get_list_or_404(Snippet)
    if request.method == "POST":
        form = SnippetForm(request.POST)
        if form.is_valid():
            snippet = form.save(commit=False)
            snippet.post = Snippet
            form.save(Snippet)
            return redirect('index')
    else:
        form = SnippetForm()
    return render(request, 'core/snippet_form.html', {'form':form})