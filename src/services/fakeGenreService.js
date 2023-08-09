export const genres = [
    { _id: "5b21ca3eeb7f6bccd471818", name: "Action" },
    { _id: "5b21ca3eeb7f6bccd471814", name: "Comedy" },
    { _id: "5b21ca3eeb7f6bccd471820", name: "Thriller" },
];

export function getGenres(){
    return genres.filter(g => g);
}