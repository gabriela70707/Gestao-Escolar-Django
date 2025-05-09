from django.urls import path
from .views import *

urlpatterns = [
    path('token/', LoginView.as_view()),
    path('professores/', ProfessorListCreateApiView.as_view()),
    path('professores/<int:pk>/', ProfessorDeleteUpdate.as_view()),
    path('disciplinas/', DisciplinasListCreateApiView.as_view()),
    path('disciplinas/<int:pk>/', DisciplinasDeleteUpdate.as_view()),
    path('reservaAmbiente/', AmbientesListCreateApiView.as_view()),
    path('reservaAmbiente/<int:pk>/', AmbientesDeleteUpdate.as_view()),
    path('professoresReservas/', ProfessorSalas.as_view({'get': 'list'})),
    path('professoresDisciplinas/', ProfessorDisciplina.as_view({'get': 'list'})),
]
