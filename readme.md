## Como usar

# Inicializar um repositório Git vazio
git init

# Adicionar o repositório remoto
git remote add origin https://github.com/jerobas/web-components

# Configurar o sparse-checkout
git config core.sparseCheckout true

# Especificar o arquivo que você deseja clonar
echo "*.ts" >> .git/info/sparse-checkout

# Fazer o checkout do branch desejado
git pull origin main