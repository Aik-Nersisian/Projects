using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Block : MonoBehaviour
{
    // config parameters
    [SerializeField] AudioClip breakSound;
    [SerializeField] GameObject blockSparkleVFX;
    [SerializeField] Sprite[] hitSprites;
   

    // cached reference (Getting reference to other elements)
    Level level;


    // state variables
    [SerializeField] int timesHit; //TODO only for debug purposes

    private void Start()
    {
        CountBreakabeBlocks();

    }

    private void CountBreakabeBlocks()
    {
        level = FindObjectOfType<Level>();

        if (tag == "Breakable")
        {
            level.countBlocks();
        }
    }


    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (tag == "Breakable")
            HandleHit();

    }

    private void HandleHit()
    {
        timesHit++;
        int maxHits = hitSprites.Length + 1;
        if (timesHit >= maxHits)
            DestroyBlock();
        else
            ShowNextHitSprite();
    }

    private void ShowNextHitSprite()
    {
        int spriteIndex = timesHit - 1;
        if (hitSprites[spriteIndex] != null)
            GetComponent<SpriteRenderer>().sprite = hitSprites[spriteIndex];
        else
            Debug.LogError("Block sprite is missing from array " + gameObject.name);
    }

    private void DestroyBlock()
    {

        FindObjectOfType<GameSession>().AddToScore();

        AudioSource.PlayClipAtPoint(breakSound, Camera.main.transform.position);

        Destroy(gameObject);

        level.BlockDestroyed();

        TriggerSparklesVFX();
       
    }

    private void TriggerSparklesVFX()
    {
        GameObject sparkles = Instantiate(blockSparkleVFX, transform.position, transform.rotation);
        Destroy(sparkles, 0.2f);
    }
}
