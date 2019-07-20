from django.shortcuts import render, get_list_or_404, redirect
from .models import Snippet
from core.forms import SnippetForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib import messages
from django_filters.rest_framework import DjangoFilterBackend
from django.views import generic

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

# Snippet List View
class SnippetListView(generic.ListView):
    model = Snippet

# Snippet Detail View
class SnippetDetailView(generic.DetailView):
    model = Snippet

# View to delete snippet
def delete_snippet(request):
    snippet = get_list_or_404(Snippet)

    if request.method =="POST":
        snippet.delete()
        messages.success(request, "Code snippet deleted!")
        return redirect('index')
    
    return render(request, 'core/snippet_confirm_delete.html')

# View to search snippet
def search_snippet(request):
    if request.method == "POST":
        search_text = request.POST['search_text']
    else:
        search_text = ''
    
    snippets = Snippet.objects.filter(title__contains=search_text)

    return render(request, 'base.html', {'snippets': snippets})