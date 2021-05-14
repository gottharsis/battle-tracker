import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantEditorComponent } from './combatant-editor.component';

describe('CombatantEditorComponent', () => {
  let component: CombatantEditorComponent;
  let fixture: ComponentFixture<CombatantEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatantEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatantEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
