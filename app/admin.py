from django.contrib import admin
from .models import Usuario, Disciplina, ReservaDeAmbiente
from django.contrib.auth.admin import UserAdmin

class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Novos campos', {'fields':('categoria',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Categoria", {'fields':('categoria',)}),
    )

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Disciplina)
admin.site.register(ReservaDeAmbiente)