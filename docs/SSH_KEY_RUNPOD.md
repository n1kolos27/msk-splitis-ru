# SSH ключ для RunPod

## Инструкция по добавлению SSH ключа в RunPod

1. Скопируйте публичный ключ ниже
2. Перейдите в RunPod → ваш под → вкладка "Connect"
3. Вставьте ключ в поле "SSH public key"
4. Нажмите "Save"

---

## Ваш публичный SSH ключ:

**Скопируйте весь этот ключ и вставьте в RunPod:**

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIELyFkw3N7iDyzzj6n9zg4VUm6YcZs2GXV9LUHljNvx2 n1kolos@mail.ru
```

---

## Хранение ключей:

- **Приватный ключ:** `C:\Users\USER\.ssh\id_ed25519` (храните в секрете!)
- **Публичный ключ:** `C:\Users\USER\.ssh\id_ed25519.pub` (можно добавлять в сервисы)

---

## Подключение к поду через SSH:

После добавления ключа в RunPod, подключитесь командой:

**Через RunPod SSH (рекомендуется):**
```powershell
ssh uaah0arcspg8v4-64411df4@ssh.runpod.io -i $env:USERPROFILE\.ssh\id_ed25519
```

**Через Direct TCP (поддерживает SCP & SFTP):**
```powershell
ssh root@203.57.40.199 -p 10266 -i $env:USERPROFILE\.ssh\id_ed25519
```

**Или на Linux/Mac:**
```bash
ssh uaah0arcspg8v4-64411df4@ssh.runpod.io -i ~/.ssh/id_ed25519
ssh root@203.57.40.199 -p 10266 -i ~/.ssh/id_ed25519
```

---

## Информация о поде:

- **Имя пода:** `solid_olive_lark`
- **ID пода:** `uaah0arcspg8v4`
- **HTTP Service:** Port 7860 (Ready)
- **API Port:** Port 19123 - для API запросов
- **Direct TCP IP:** `203.57.40.199:10266`
- **SSH Port:** 22

---

**Сгенерировано:** Январь 2025  
**Email:** n1kolos@mail.ru

