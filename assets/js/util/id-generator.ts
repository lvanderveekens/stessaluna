let id = 0;

export const nextId = () => {
    console.log("NEXT ID CALLED");
    id++;
    return id;
}