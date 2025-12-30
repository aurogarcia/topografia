# Como Adicionar Imagem de Fundo Personalizada

## 🎨 Opções de Fundo Implementadas

**Atualmente seu site tem:**
- ✅ **Padrão topográfico**: Pontos e linhas sutis
- ✅ **Grade de coordenadas**: Simula malha topográfica  
- ✅ **Cor verde profissional**: Combina com sua marca
- ✅ **Transparência sutil**: Não atrapalha a leitura

## 🖼️ Para Usar Sua Própria Imagem

### **Opção 1 - Imagem de Fundo Fixa:**
Substitua no arquivo `css/styles.css`:

```css
body {
    background-image: url('../images/fundo-topografia.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: -1;
}
```

### **Opção 2 - Só no Banner Principal:**
```css
.hero {
    background-image: url('../images/hero-background.jpg');
    background-size: cover;
    background-position: center;
}
```

## 📸 Tipos de Imagem Recomendadas

**Para fundo de topografia:**
- 🗺️ **Mapas topográficos antigos** (textura vintage)
- 📐 **Instrumentos de medição** (teodolito, GPS)
- 🌄 **Paisagens com linhas de contorno**
- 🧭 **Elementos geométricos sutis**

## 💡 Dicas Importantes

1. **Resolução**: Mínimo 1920x1080px
2. **Tamanho**: Máximo 500KB (para velocidade)
3. **Opacidade**: Use sobreposição branca 70-90%
4. **Contraste**: Garanta que texto continue legível

## 🎯 Sugestões de Sites para Imagens

**Gratuitas:**
- Unsplash.com (busque: "topography", "surveying")
- Pexels.com (busque: "civil engineering")
- Pixabay.com

**Palavras-chave:**
- topographic map
- surveying equipment  
- civil engineering
- coordinate system
- grid pattern

## ⚙️ Como Implementar

1. **Salve sua imagem** como `fundo-topografia.jpg` na pasta `images/`
2. **Escolha uma das opções** acima
3. **Cole o código** no final do arquivo `styles.css`
4. **Teste** se ficou legível
5. **Ajuste opacidade** se necessário

**Quer que eu implemente uma imagem específica que você tem?** 🎨