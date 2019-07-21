from django.shortcuts import render, get_list_or_404, redirect, get_object_or_404
from .models import Snippet, CustomUser, UserPage
from core.forms import SnippetForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy, reverse
from django.contrib import messages
from django_filters.rest_framework import DjangoFilterBackend
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from core.filters import SnippetFilter

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

# View to copy snippet
def copy_snippet(request, pk):
    """View function for user to copy snippet to user page."""
    snippet = get_object_or_404(Snippet, pk=pk)
    
    if request.method == 'GET':
        if request.user in snippet.copy_snippet.all():
            snippet.copy_snippet.remove(request.user)
            messages.info(request, f"You have removed {snippet.copy_snippet} from your user page.")
        else:
            snippet.copy_snippet.add(request.user)
            messages.success(request, f"You have added {snippet.copy_snippet} to your user page.")
            
    return HttpResponseRedirect(request.GET.get("next"))


def search_snippets(request):
    template_name = 'core/search_list.html'
    snippets = Snippet.objects.filter()
    snippets_filter = SnippetFilter(request.GET, queryset=snippets)

    return render(request, 'core/search_list.html', {'filter': snippets_filter})


# View to see list of snippets on user page
def user_view(request):
    """View function for user to view all code snippets on user page."""
    user_list = UserPage.objects.filter(user=request.user)

    return render(request, 'core/user_detail.html', {'user_list': user_list})

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