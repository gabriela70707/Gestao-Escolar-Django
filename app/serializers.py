from rest_framework import serializers
from .models import Usuario, ReservaDeAmbiente, Disciplina
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer): #precisa definir username e password para criar um professor
    class Meta:
        model = Usuario
        fields = '__all__'


class AmbienteSerializer(serializers.ModelSerializer):
    disciplina_nome = serializers.CharField(source="disciplina_professor.nome", read_only=True)
    disciplina_professor = serializers.PrimaryKeyRelatedField(queryset=Disciplina.objects.all())  # Permite entrada

    class Meta:
        model = ReservaDeAmbiente
        fields = ["id", "data_inicio", "data_termino", "periodo", "sala_reservada", "disciplina_professor", "disciplina_nome"]


    

class DisciplinasSerializer(serializers.ModelSerializer):
    professor_nome = serializers.CharField(source="professor_responsavel.nome", read_only=True)
    
    class Meta:
        model = Disciplina
        fields = '__all__'

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['usuario'] = {
            'username' : self.user.username,
            'cargo' : self.user.cargo
        }
        return data