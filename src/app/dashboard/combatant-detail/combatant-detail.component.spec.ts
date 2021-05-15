import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantDetailComponent } from './combatant-detail.component';

describe('CombatantDetailComponent', () => {
  let component: CombatantDetailComponent;
  let fixture: ComponentFixture<CombatantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatantDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
