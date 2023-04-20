varying float vSize;
varying vec3 vColor;
void main(){
    if(vSize <= 0.2){
        gl_FragColor = vec4(1,1,1,1.0);
        gl_FragColor.a = 1.0;
    } else {
        gl_FragColor = vec4(vColor, 0.6);
    }
}