from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    CARGO = [
        ('G', 'Gestor'),
        ('P', 'Professor')
    ]

    cargo = models.CharField(max_length=1, choices=CARGO, default='P')
    NI = models.CharField(max_length=5) #numero de identificação
    nome = models.CharField(max_length=25)
    email = models.CharField(max_length=50)
    telefone = models.CharField(max_length=11)
    data_nascimento = models.DateField(null=True, blank=True)
    data_contratacao = models.DateField(null=True, blank=True)
    
       
    def __str__(self):
        return self.username
    
    
class Disciplina(models.Model):
    #Adicionar choices para nome de displina e nome de curso
    nome = models.CharField(max_length=50)
    curso = models.CharField(max_length=50)
    carga_horaria = models.PositiveIntegerField()
    descricao = models.CharField(max_length=200)
    professor_responsavel = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.nome
    

class ReservaDeAmbiente(models.Model):
    data_inicio = models.DateTimeField()
    data_termino = models.DateTimeField()
    PERIODO = [
        ('M', 'Manha'),
        ('T', 'Tarde'),
        ('N', 'Noite')
    ]
    periodo = models.CharField(max_length=1, choices=PERIODO)
    SALAS = [
        ('1', 'Sala 1'),
        ('2', 'Sala 2'),
        ('3', 'Sala 3'),
        ('4', 'Sala 4'),
        ('5', 'Sala 5')
    ]
    sala_reservada = models.CharField(max_length=1, choices=SALAS)
    disciplina_professor = models.ForeignKey(Disciplina, on_delete=models.CASCADE)

    def __str__(self):
        return self.sala_reservada


