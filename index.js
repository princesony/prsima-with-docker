const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
console.log(process.env.DATABASE_UR)
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
}); 

// Update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email, password },
  });
  res.json(user);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
