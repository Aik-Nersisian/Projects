using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour

   
{

    [Header("Player")]
    //config params
    [SerializeField] float moveSpeed = 10f;

    //we use this to block the ship of going out till the camera
    //hits the pivot point of it. Instead it will stop 1 poit earlier

    [SerializeField] float padding = 1f;
    [SerializeField] int health = 200;

    [Header("Projectile")]
    [SerializeField] GameObject laserPrefab;
    [SerializeField] float projectileSpeed = 10f;
    [SerializeField] float projectileFiringPeriod = 0.01f;

    Coroutine firingCoroutine;

    float xMin;
    float xMax;
    float yMin;
    float yMax;

    // Start is called before the first frame update
    void Start()
    {
        SetUpMoveBoundaries();

        
    }

    // Update is called once per frame
    void Update()
    {
        Move();
        Fire();
    }


    private void Fire()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            firingCoroutine = StartCoroutine(FireContinuosuly());
        }
        if(Input.GetButtonUp("Fire1"))
        {
            StopCoroutine(firingCoroutine);
        }
    }


    IEnumerator FireContinuosuly()
    {
        //create the laser beam on b mouse0 or space click. In Detail - Create the laserPrefab (that we already hooked to the playerObject),
        //at the position and the rotation angle of the player.
        // The Instantiate creates a reular Object. Hence, we need to create it AS A GameObject in order to access its parameters
        while (true)
        {
            GameObject laser = Instantiate(
                    laserPrefab,
                    transform.position,
                    Quaternion.identity) as GameObject;

            laser.GetComponent<Rigidbody2D>().velocity = new Vector2(0, projectileSpeed);
            yield return new WaitForSeconds(projectileFiringPeriod);
        }
    }

    private void Move()
    {
        var deltaX = Input.GetAxis("Horizontal") * Time.deltaTime * moveSpeed;
        var deltaY = Input.GetAxis("Vertical") * Time.deltaTime * moveSpeed;

        var newXPos = Mathf.Clamp(transform.position.x + deltaX, xMin, xMax);    
        var newYPos = Mathf.Clamp(transform.position.y + deltaY, yMin, yMax);

        transform.position = new Vector2(newXPos, newYPos);

        Rotate(deltaX);

    }


    private void SetUpMoveBoundaries()
    {
        Camera gameCamera = Camera.main; //the main camera in the scene
        xMin = gameCamera.ViewportToWorldPoint(new Vector3(0, 0, 0)).x + padding;
        xMax = gameCamera.ViewportToWorldPoint(new Vector3(1, 0, 0)).x - padding;

        yMin = gameCamera.ViewportToWorldPoint(new Vector3(0, 0, 0)).y + padding;
        yMax = gameCamera.ViewportToWorldPoint(new Vector3(0, 1, 0)).y - padding;
    }


    //extra method that rotates the ship to left or right
    private void Rotate(float deltaX)
    {
        int newXRot = 0;
        int newZRot = 0;

        if (deltaX < 0)
        {
            newXRot = 25;
            newZRot = 4;
    
        }
        else if (deltaX > 0)
        {
            newXRot = -25;
            newZRot = -4;
        }
        transform.rotation = Quaternion.Euler(0, newXRot, newZRot);
    }


    private void OnTriggerEnter2D(Collider2D other)
    {
        DamageDealer damageDealer = other.gameObject.GetComponent<DamageDealer>();
        if (!damageDealer)
        {
            return;
        }
        ProcessHit(damageDealer);
    }

    private void ProcessHit(DamageDealer damageDealer)
    {
        health -= damageDealer.GetDamage();
        damageDealer.Hit(); //detsroy the laser after the hit
        if (health <= 0)
        {
            Destroy(gameObject);
        }
    }
}
