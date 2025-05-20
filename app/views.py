from .models import Usuario, Disciplina, ReservaDeAmbiente
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .serializers import LoginSerializer, UsuarioSerializer, AmbienteSerializer, DisciplinasSerializer
from .permissions import IsGestor, IsProfessor
from rest_framework.viewsets import ReadOnlyModelViewSet #permite somente o metodo GET
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError #estou usando para validar se já existe uma reserva em determinada data e horario 


#conseguir o token de acesso (login)
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            username = request.data.get("username")
            usuario = Usuario.objects.filter(username=username).first()

            if usuario:
                cargo = "gestor" if usuario.cargo == "G" else "professor"
                response.data["cargo"] = cargo  # Adiciona o cargo à resposta

        return response


#visualizar e cadastrar professores
class ProfessorListCreateApiView(ListCreateAPIView):
    queryset = Usuario.objects.filter(cargo='P') #mostrar apenas os professores
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)  # Executa a lógica padrão de criação
        return Response({"message": "Professor registrado com sucesso!"}, status=status.HTTP_201_CREATED)

#atualizar e excluir professores
class ProfessorDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.filter(cargo='P') #mostrar apenas os professores
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    #Reescrevendo as funções para retornarem um mansagem ao usuario
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)  # Chama a lógica padrão do Django
        return Response({"message": "Dados do Professor atualizado com sucesso!"}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)  # Executa a exclusão normalmente
        return Response({"message": "Registro do professor excluido com sucesso!"}, status=status.HTTP_204_NO_CONTENT) 

#visualizar e cadastrar reserva de ambientes
from rest_framework.exceptions import ValidationError

class AmbientesListCreateApiView(ListCreateAPIView):
    queryset = ReservaDeAmbiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsGestor]

    def create(self, request, *args, **kwargs):
        data_inicio = request.data.get("data_inicio")
        data_termino = request.data.get("data_termino")
        periodo = request.data.get("periodo")
        sala_reservada = request.data.get("sala_reservada")

        # Verifica se já existe uma reserva exatamente na mesma data, sala e período
        reserva_existente = ReservaDeAmbiente.objects.filter(
            sala_reservada=sala_reservada,
            periodo=periodo,
            data_inicio=data_inicio,
            data_termino=data_termino
        ).exists()

        if reserva_existente:
            raise ValidationError({"message": "Já existe uma reserva para essa sala, período e data."})

        response = super().create(request, *args, **kwargs)
        return Response({"message": "Reserva realizada com sucesso!"}, status=status.HTTP_201_CREATED)



#atualizar e excluit reserva de ambientes
class AmbientesDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = ReservaDeAmbiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)  
        return Response({"message": "Reserva atualizada com sucesso!"}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)  
        return Response({"message": "Reserva excluída com sucesso!"}, status=status.HTTP_204_NO_CONTENT) 


#visualizar e cadastrar disciplinas
class DisciplinasListCreateApiView(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsGestor]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)  # Executa a lógica padrão de criação
        return Response({"message": "Disciplina registrada com sucesso!"}, status=status.HTTP_201_CREATED)


#atualizar e excluir disciplinas
class DisciplinasDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)  # Chama a lógica padrão do Django
        return Response({"message": "Disciplina atualizada com sucesso!"}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)  # Executa a exclusão normalmente
        return Response({"message": "Disciplina excluída com sucesso!"}, status=status.HTTP_204_NO_CONTENT) 
    



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