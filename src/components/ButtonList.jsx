const ButtonList = ({ colors, selectedColor, setSelectedColor }) => {
    const colorNames = {
        white: "White",
        "#ffffff": "White",
        "#faafa8": "Coral",
        "#f39f76": "Peach",
        "#fff8b8": "Sand",
        "#e2f6d3": "Mint",
        "#b4ddd3": "Teal",
        "#d4e4ed": "Blue",
        "#f6e2dd": "Rose"
    };


    return (
        <div className="button-list">
            {colors.map((color) => (
                <button
                    key={color}
                    type="button"
                    className={selectedColor === color ? "color-button selected" : "color-button"}
                    style={{ backgroundColor: color }}
                    title={colorNames[color] || color}
                    aria-label={`Use ${colorNames[color] || color} note color`}
                    aria-pressed={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                ></button>
            ))}
        </div>
    );
};

export default ButtonList;
