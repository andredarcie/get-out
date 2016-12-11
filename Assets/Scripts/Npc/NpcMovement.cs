using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NpcMovement : MonoBehaviour {

    public float moveSpeed;
    private Rigidbody2D rbody;
    Animator anim;
    public bool isWalking;
    private Vector2 movementVector;

    public float walkTime;
    private float walkCounter;

    public float waitTime;
    private float waitCounter;

    private int walkDirection;

    // Use this for initialization
    void Start () {

        rbody = GetComponent<Rigidbody2D>();
        anim = GetComponent<Animator>();

        waitCounter = waitTime;
        walkCounter = walkTime;

        ChooseDirection();

    }
	
	// Update is called once per frame
	void Update () {

        movementVector = Vector2.zero;

        if (isWalking)
        {
            anim.SetBool("iswalking", true);

            walkCounter -= Time.deltaTime;

            switch (walkDirection)
            {
                case 0:
                    movementVector = new Vector2(0, moveSpeed);
                    break;
                case 1:
                    movementVector = new Vector2(moveSpeed, 0);
                    break;
                case 2:
                    movementVector = new Vector2(0, -moveSpeed);
                    break;
                case 3:
                    movementVector = new Vector2(-moveSpeed, 0);
                    break;
            }

            rbody.velocity = movementVector;
            anim.SetFloat("input_x", movementVector.x);
            anim.SetFloat("input_y", movementVector.y);

            if (walkCounter < 0)
            {
                isWalking = false;
                waitCounter = waitTime;
            }

        } else
        {
            anim.SetBool("iswalking", false);

            waitCounter -= Time.deltaTime;

            rbody.velocity = Vector2.zero;

            if (waitCounter < 0)
            {
                ChooseDirection();
            }
        }
		
	}

    public void ChooseDirection()
    {
        walkDirection = Random.Range(0, 4);
        isWalking = true;
        walkCounter = walkTime;
    }
}
