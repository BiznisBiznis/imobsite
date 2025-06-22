// Mock data mimicking a database
let mockProperties = [
    {
        id: "1",
        title: "Garsonieră ultracentral",
        price: 61000,
        location: "București",
        area: 35,
        rooms: 1,
        type: "Apartament cu 1 camera de vânzare",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
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
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        badges: ["Exclusivitate"],
    }
];

let mockTeam = [
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
        image: "https://randomuser.me/api/portraits/women/75.jpg",
    }
];

module.exports = {
    properties: mockProperties,
    team: mockTeam,
};
