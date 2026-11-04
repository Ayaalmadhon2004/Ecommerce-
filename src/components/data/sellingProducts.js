const sellingProducts = [
    {
        id:0,
        img:"assets/photos/trowser.webp",
        name:"The north coat",
        price:"$260",
        prevPrice:"$360",
        rate:((65)),
        stars:5,
    },
     {
        id:1,
        img:"assets/photos/suitecase.webp",
        name:"Gucci duffle bag",
        price:"$960",
        prevPrice:"$1160",
        rate:((65)),
        stars:5,
    },
     {
        id:2,
        img:"assets/photos/music.webp",
        name:"RGB liquid CPU Cooler",
        price:"$160",
        prevPrice:"$170",
        rate:((65)),
        stars:5,
    },
     {
        id:3,
        img:"assets/photos/book-corner.webp",
        name:"Small BookSelf",
        model3d:"models/Duck.glb",
        colors:[
            {name:"Red",hex:"#d94141"},
            {name:"Blue",hex:"#3b6fd9"},
            {name:"Green",hex:"#3f9d5a"},
            {name:"Black",hex:"#222222"},
        ],
        hotspots:[
            {position:"0.9 1.25 -0.1", normal:"1 0 0", label:"Smooth rounded edges", description:"Gently rounded edges that are safe to handle."},
            {position:"0.3 1.55 -0.04", normal:"0 1 0", label:"Premium glossy finish", description:"A bright, easy-to-wipe finish that resists fading."},
            {position:"0.1 0.45 0.5", normal:"0 0 1", label:"Solid sturdy build", description:"A solid body that holds up to everyday use."},
            {position:"-0.62 0.55 -0.06", normal:"-1 0 0", label:"Stable balanced base", description:"A weighted base that keeps it upright."},
        ],
        price:"$360",
        prevPrice:"$160",
        rate:((99)),
        stars:5,
    },
];

export default sellingProducts;