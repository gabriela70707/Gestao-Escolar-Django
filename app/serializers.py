from rest_framework import serializers
from .models import Usuario, ReservaDeAmbiente, Disciplina
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer): #precisa definir username e password para criar um professor
    class Meta:
        model = Usuario
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaDeAmbiente
        fields = '__all__'

class DisciplinasSerializer(serializers.ModelSerializer):
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