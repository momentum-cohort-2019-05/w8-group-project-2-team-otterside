from django.shortcuts import render, get_list_or_404, redirect
from .models import Snippet
from core.forms import SnippetForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

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

# View to update snippet
class SnippetUpdate(UpdateView):
    """View for editing snippet file"""
    model = Snippet
    fields = '__all__'
    success_url = reverse_lazy('index')

class SnippetDelete(DeleteView):
    """View for deleting snippet file"""
    model = Snippet
    success_url = reverse_lazy('index')