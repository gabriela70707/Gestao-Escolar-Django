from .models import Usuario, Disciplina, ReservaDeAmbiente
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .serializers import LoginSerializer, UsuarioSerializer, AmbienteSerializer, DisciplinasSerializer
from .permissions import IsGestor, IsProfessor
from rest_framework.viewsets import ReadOnlyModelViewSet #permite somente o metodo GET


#conseguir o token de acesso
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


#visualizar e cadastrar professores
class ProfessorListCreateApiView(ListCreateAPIView):
    queryset = Usuario.objects.filter(cargo='P') #mostrar apenas os professores
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]

#atualizar e excluir professores
class ProfessorDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.filter(cargo='P') #mostrar apenas os professores
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

#visualizar e cadastrar reserva de ambientes
class AmbientesListCreateApiView(ListCreateAPIView):
    queryset = ReservaDeAmbiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsGestor]

#atualizar e excluit reserva de ambientes
class AmbientesDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = ReservaDeAmbiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'


#visualizar e cadastrar disciplinas
class DisciplinasListCreateApiView(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsGestor]


#atualizar e excluir disciplinas
class DisciplinasDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'



#professores acessarem suas materias
class ProfessorDisciplina(ReadOnlyModelViewSet):
    serializer_class = DisciplinasSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        usuario = self.request.user  #ver o professor que esta fazendo a requisição
        return Disciplina.objects.filter(professor_responsavel=usuario) #retornar somente as materias que tenha relação com o professor da requisição
    

#professores acessarem as salas reservadas para suas aulas
class ProfessorSalas(ReadOnlyModelViewSet):
    serializer_class = AmbienteSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        usuario = self.request.user  # Obtém o professor autenticado
        return ReservaDeAmbiente.objects.filter(disciplina_professor__professor_responsavel=usuario)  # usa o underscore para navegar pelas ForeignKey


"""
disciplina_professor → Aponta para Disciplina.

professor_responsavel → Aponta para Usuario dentro de Disciplina.

usuario → O professor autenticado.
"""