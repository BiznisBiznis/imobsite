import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        configure: (proxy, options) => {
          // Mock API responses when backend is not available
          proxy.on("error", (err, req, res) => {
            console.warn("Backend not available, serving mock data");
            res.writeHead(200, { "Content-Type": "application/json" });

            if (req.url?.includes("/api/properties")) {
              if (
                req.url?.includes("/api/properties/") &&
                req.url.split("/").length > 3
              ) {
                // Single property
                res.end(
                  JSON.stringify({
                    success: true,
                    data: {
                      id: "1",
                      title: "Garsonieră ultracentral",
                      price: 61000,
                      location: "București",
                      area: 35,
                      rooms: 1,
                      type: "Apartament cu 1 camera de vânzare",
                      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      thumbnailUrl:
                        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      badges: ["Nou", "Redus"],
                    },
                  }),
                );
              } else {
                // Properties list
                res.end(
                  JSON.stringify({
                    success: true,
                    data: {
                      data: [
                        {
                          id: "1",
                          title: "Garsonieră ultracentral",
                          price: 61000,
                          location: "București",
                          area: 35,
                          rooms: 1,
                          type: "Apartament cu 1 camera de vânzare",
                          videoUrl:
                            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                          thumbnailUrl:
                            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                          badges: ["Nou", "Redus"],
                        },
                        {
                          id: "2",
                          title: "Apartament 2 camere, modern",
                          price: 85000,
                          location: "Cluj-Napoca",
                          area: 55,
                          rooms: 2,
                          type: "Apartament cu 2 camere de vânzare",
                          videoUrl:
                            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                          thumbnailUrl:
                            "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                          badges: ["Exclusivitate"],
                        },
                      ],
                      total: 2,
                      page: 1,
                      limit: 10,
                      totalPages: 1,
                    },
                  }),
                );
              }
            } else if (req.url?.includes("/api/team")) {
              res.end(
                JSON.stringify({
                  success: true,
                  data: {
                    data: [
                      {
                        id: "1",
                        name: "Mihai Eminescu",
                        role: "Manager",
                        phone: "+40 712 345 678",
                        email: "mihai.e@estate.ro",
                        image: "https://randomuser.me/api/portraits/men/75.jpg",
                      },
                      {
                        id: "2",
                        name: "Veronica Micle",
                        role: "Agent imobiliar senior",
                        phone: "+40 712 345 679",
                        email: "veronica.m@estate.ro",
                        image:
                          "https://randomuser.me/api/portraits/women/75.jpg",
                      },
                    ],
                    total: 2,
                  },
                }),
              );
            } else {
              res.end(
                JSON.stringify({
                  success: false,
                  message: "Mock API endpoint not found",
                }),
              );
            }
          });
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
