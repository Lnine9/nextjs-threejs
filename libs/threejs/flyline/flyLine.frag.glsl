varying float vSize;
varying vec3 vColor;
void main(){
    if(vSize <= 0.2){
        discard;
    } else {
        gl_FragColor =vec4(vColor, 0.5);
    }
}