import app from './app';
import authRoutes from "./modules/auth/auth.routes";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use("/auth", authRoutes);