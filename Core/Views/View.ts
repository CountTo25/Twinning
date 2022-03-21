export default class View {
    private __markView = true;
    protected render: string = '';

    public getAssetPath() {
        return this.render;
    }
}