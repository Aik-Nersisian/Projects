using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Level : MonoBehaviour

{
    //parameters
    [SerializeField] int breakableBlocks; //for debug purposes

    //cache refernece
    SceneLoader sceneloader;

    private void Start()
    {
        sceneloader = FindObjectOfType<SceneLoader>();
    }

    public void countBlocks()
    {
        breakableBlocks++;
    }

    public void BlockDestroyed()
    {
        breakableBlocks--;
        if (breakableBlocks <= 0)
            sceneloader.loadNextScene();
           
    }
}
